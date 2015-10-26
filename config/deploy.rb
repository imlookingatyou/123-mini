require 'mina/multistage'
require 'mina/bundler'
require 'mina/rails'

require_relative 'mina-rsync.rb'
require_relative 'hogarth.rb'
require_relative 'npm.rb'
require_relative 'grunt.rb'
require_relative 'composer.rb'

set :projectGroup, 'santander'
set :projectName,  '123-mini'
set :domainName, 'santander123mini.co.uk'
set :mysqldbName, 'santander123mini'
set :mysqldump, 'doc/db/santander123mini.sql'

set :rsync_options, %w[--recursive --links --delete --delete-excluded --exclude .git*]

set :keep_releases, 5

set :identity_file, '/var/lib/jenkins/.ssh/id_rsa'

desc "Deploys the current version to the server."
task :deploy => :environment do
    deploy do
        invoke :'hogarth:deploy'
    end
end

desc "Rolls back the latest release"
task :rollback => :environment do
    deploy do
	invoke :'hogarth:rollback'
    end
end

task "rsync:stage" do
  invoke 'hogarth:precompile'
end
