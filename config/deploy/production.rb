set :domain,     "134.213.155.241"
set :deploy_to,  "/var/www/#{projectGroup}/#{projectName}"
set :user,       "jenkins"
set :repository, "git@hww-gitlab.cloudapp.net:#{projectGroup}/#{projectName}.git"
set :branch,     ENV['Branch'] || `git rev-parse --abbrev-ref HEAD | tr -d '\n'`
set :tag,	ENV['Tag']
set :mysqluser,	 "root"
set :mysqlpw,	 "RR3XS6eT2oZShJ11"
set :mysql_server, "10.181.193.39"

set :use_slots,  true

set :identity_file, '/var/lib/jenkins/.ssh/id_rsa'
