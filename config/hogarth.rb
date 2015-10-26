namespace :hogarth do
    desc "Deploys the current version to the server."
    task :deploy do
        invoke :'rsync:deploy'
    queue %[ls -Art "#{deploy_to}/releases" | sort -r | tail -n 1 | xargs -I active chmod -R 777 "#{deploy_to}/releases/active"]
        invoke :'deploy:cleanup'

        to :launch do
            invoke :'hogarth:launch'
        end
    end

    task :rollback do

	queue %[echo "-----> Rolling back to previous release for instance: #{domain}"]

	# Delete existing sym link and create a new symlink pointing to the previous release
 	queue %[echo -n "-----> Creating new symlink from the previous release: "]
	queue %[ls -Art "#{deploy_to}/releases" | sort | tail -n 2 | head -n 1]
	queue! %[ls -Art "#{deploy_to}/releases" | sort | tail -n 2 | head -n 1 | xargs -I active ln -nfs "#{deploy_to}/releases/active" "#{deploy_to}/current"]

	queue %[echo -n "-----> Rolling back database: "]
	queue %{mysql -u #{mysqluser} -p#{mysqlpw} -h #{mysql_server} #{mysqldbName} < /var/www/#{projectGroup}/#{projectName}/current/#{mysqldump}}
	# Remove latest release folder (current release)
	queue %[echo -n "-----> Deleting current release: "]
	queue %[ls -Art "#{deploy_to}/releases" | sort | tail -n 1]
	queue! %[ls -Art "#{deploy_to}/releases" | sort | tail -n 1 | xargs -I active rm -rf "#{deploy_to}/releases/active"]
    end

    task :precompile do
      Dir.chdir settings.rsync_stage do
        invoke :'composer:install'
        system "bin/console upload:mortgages"
      end
    end

    desc "Run updates for slot aware deployments"
    task :slots do
        set :path, "/var/www/#{projectGroup}/#{projectName}/current"

        if use_slots
            if branch == 'master'
                set :slot, 'master'
            else
                set :slot, `echo #{branch} | awk '{split($0,a,"/"); print a[2]}' | tr -d '\n'`
            end

            if slot != ''
                set :path, "/var/www/#{projectGroup}/#{projectName}/slot/#{slot}"
                queue %{echo "-----> Deploying slot (#{slot}) to (#{path})..."}
                queue %{echo "#{branch}" > ./REVISION}
                queue "sudo rm -rf #{path} && mkdir -p #{path} && cp -r ./ #{path}"
#        queue "chmod -R 777 #{path}/var"
            end
        end
     end
    task :launch do
	set :vhost_config, erb('config/apache.erb')

	queue %{echo "#{vhost_config}" > /etc/apache2/sites-available/#{domainName}.conf}
	queue %{ln -sf /etc/apache2/sites-available/#{domainName}.conf /etc/apache2/sites-enabled/#{domainName}.conf }

	#in case we use redirects separately
	#queue %{cp /var/www/#{projectGroup}/#{projectName}/current/config/redirects/* /etc/apache2/redirects/}

	queue %{mysql -u #{mysqluser} -p#{mysqlpw} -h #{mysql_server} #{mysqldbName} < /var/www/#{projectGroup}/#{projectName}/current/#{mysqldump}}
        # Restart services
        queue %{echo "-----> Restarting Service: Apache2..."}
        queue "sudo service apache2 reload"
    end
end