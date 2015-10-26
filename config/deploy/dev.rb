set :domain,     "10.252.32.113"
set :deploy_to,  "/var/www/#{projectGroup}/#{projectName}"
set :user,       "jenkins"
set :repository, "git@hww-gitlab.cloudapp.net:#{projectGroup}/#{projectName}.git"
set :branch,     ENV['Branch'] || `git rev-parse --abbrev-ref HEAD | tr -d '\n'`
set :tag,	ENV['Tag']
set :mysqluser,	 "debian-sys-maint"
set :mysqlpw,	 "3e9KDwbjeUYa6NIb"
set :mysql_server, "localhost"

set :use_slots,  true

set :identity_file, '/var/lib/jenkins/.ssh/id_rsa'
