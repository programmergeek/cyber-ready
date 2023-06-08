# Cyber Ready

A simple cyber readiness training platform for the web.

> This project assumes that you are running a debian based machine of sorts.


# Setup Guacamole

## Install Docker

1. Install packages to allow apt to use a repository over HTTPS

```bash
sudo apt-get update -y
sudo apt-get install ca-certificates curl gnupg
```

2. Add Docker's official GPG key

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

3. Setup the repository

```bash
echo \
"deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
"$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

4. Update the package index

```bash
sudo apt-get update -y
```

5. Install the latest version of docker

```bash
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## Install Guacamole

1. Pull the Guacamole and MySQL docker images

```bash
docker pull guacamole/guacamole
docker pull guacamole/guacd
docker pull mysql/mysql-server
```

2. Create a database initialization script to create a table for authentication.

```bash
docker run --rm guacamole/guacamole /opt/guacamole/bin/initdb.sh --mysql > initdb.sql
```

3. Create password for MySQL root.

```bash
docker run --name authentication-database -e MYSQL_ROOT_PASSWORD=YourStrongPasswordHere -d mysql/mysql-server
```

4. Rename and move `initdb.sql` into the MySQL container.

```bash
docker cp initdb.sql authentication-database:/guac_db.sql
```

5. Open a bash shell within the MySQL Docker container. The shell prompt now changes to `bash-4.4#` or something similar.

```bash
docker exec -it authentication-database bash
```

6. Within the bash shell prompt for the container, log in to mysql as the root user. The prompt should change again to `mysql>`

```bash
mysql -u root -p
```

7. While in the mysql prompt, create a database, and create a new user for that database. When running the below commands, replace `password` with a secure password string for the new user for your database.

```sql
CREATE DATABASE guacamole_db;
CREATE USER 'guacamole_user'@'%' IDENTIFIED BY 'password';
GRANT SELECT,INSERT,UPDATE,DELETE ON guacamole_db.* TO 'guacamole_user'@'%';
FLUSH PRIVILEGES;
```

8. Once completed, enter quit to exit mysql and return to the bash shell for the container.

9. While in the bash shell, create tables from the initialization script for the new database.

```bash
cat guac_db.sql | mysql -u root -p guacamole_db
```

If you’d like, you can verify that the tables were successfully created by logging back into the mysql prompt and viewing the tables in the database.

```bash
mysql -u guacamole_user -p # enter the password you created
```

```sql
/* Show tables in guacamole_db*/
USE guacamole_db;
SHOW TABLES;
quit
```

10. Leave the bash shell for the container and return to the main shell of your Linux system by entering exit

## Configure Guacamole


# Setup the Virtual Machine

## Vagrant
### **Install Vagrant**



### **Configure your Virtual Machine**

Create a file called `Vagrantfile` and then copy and paste the following into it:

```ruby
Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/bionic64"
  config.vm.box_version = "20230530.0.0"
  config.vm.network "private_network", ip: "192.168.56.88"

  config.vm.provider :virtualbox do |v|
    v.memory = 4096
    v.name="ubuntu"
  end

  # Enable RDP
  config.vm.network "forwarded_port", guest: 3389, host: 3389, id: "rdp", auto_correct: true

  # Update repositories
  config.vm.provision :shell, inline: "sudo apt-get update -y"

  # Upgrade installed packages
  config.vm.provision :shell, inline: "sudo apt-get upgrade -y"
  config.vm.provision :shell, inline: "sudo apt-get install -y xrdp"

  # start xRDP on startup
  config.vm.provision :shell, inline: "sudo systemctl enable xrdp"

  # Add desktop environment
  config.vm.provision :shell, inline: "sudo apt-get install -y --no-install-recommends ubuntu-desktop"
  config.vm.provision :shell, inline: "sudo apt-get install -y --no-install-recommends virtualbox-guest-dkms virtualbox-guest-utils virtualbox-guest-x11"
  
  # Add `vagrant` to Administrator
  config.vm.provision :shell, inline: "sudo usermod -a -G sudo vagrant"

  # Restart
  config.vm.provision :shell, inline: "sudo shutdown -r now"
  
end

```

## Packer (Optional but Recommended)


# Connect the Virtual Machine to Guacamole