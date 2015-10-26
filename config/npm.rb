namespace :npm do
    desc "NPM install"
    task :install do
        print_status "NPM install..."
        system "npm install"
    end
end
