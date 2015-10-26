namespace :grunt do
    desc "Grunt install"
    task :install do
        print_status "Grunt install..."
        system "grunt"
    end
end
