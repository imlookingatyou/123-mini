namespace :composer do
    desc "Composer Install"
    task :install do
        print_status "Composer Install..."
        system "composer install --no-dev"
    end
end
