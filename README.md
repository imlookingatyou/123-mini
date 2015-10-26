# Setting up local development environment --> santander123mini

## Requirements
You must have the followings installed.

1.  [Vagrant](https://www.vagrantup.com/downloads.html)
2.  [Virtualbox](https://www.virtualbox.org/wiki/Downloads) 

## Run vagrant
    vagrant up

## Setup your host
   
Add the following to your `/etc/hosts/` file

    192.168.33.99	santander123mini.dev

Now, you can access the dev site on [http://santander123mini.dev](http://santander123mini.dev)

## Database Access

Access database using SSH Connection

    Mysql Host: 127.0.0.1
    user:       root
    pass:       root
    Database:   santander123mini
    
    SSH Host:   192.168.33.99
    SSH User:   vagrant
    SSH Pass:   vagrant

 If your database is emtpy for some reason? Run the following command
    
    vagrant provision