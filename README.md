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

## Initialize the Guacamole Containers

1. Start guacd in Docker:

```bash
docker run --name example-guacd -d guacamole/guacd
```

2. Start guacamole in Docker, making sure to link the containers so Guacamole can verify credentials stored in the MySQL database. Replace the value for `MYSQL_PASSWORD` with the password you configured for the MySQL database user `guacamole_user`.

```bash
docker run --name example-guacamole --link example-guacd:guacd --link example-mysql:mysql -e MYSQL_DATABASE=guacamole_db -e MYSQL_USER=guacamole_user -e MYSQL_PASSWORD=guacamole_user_password -d -p 127.0.0.1:8080:8080 guacamole/guacamole
```

3. To verify that all the docker containers are running properly, run the following command.

```bash
docker ps -a
```

## Configure Guacamole


# Setup the Virtual Machine

## VirtualBox

1. Import VirtualBox’s repository key

```bash
curl -fsSL https://www.virtualbox.org/download/oracle_vbox_2016.asc|sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/oracle_vbox_2016.gpg
curl -fsSL https://www.virtualbox.org/download/oracle_vbox.asc|sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/oracle_vbox.gpg
echo "deb [arch=amd64] https://download.virtualbox.org/virtualbox/debian bullseye contrib" | sudo tee /etc/apt/sources.list.d/virtualbox.list
```

2. Re-build the cache
```bash
sudo apt update
```

3. Install dkms to keep up with the various vitualbox kernel modules

```bash
sudo apt install -y dkms
``` 

4. Install virtualbox

```bash
sudo apt install -y virtualbox virtualbox-ext-pack
```

## Vagrant

### **Install Vagrant**

If you are using a Debian or Ubuntu system, simply copy and paste the following into your command shell:

```bash
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install vagrant
```

If you are using some other debain based system like Kali linux the follow the following instructions:

1. Download the vagrant binaries [here](https://https://developer.hashicorp.com/vagrant/downloads)

2. Open you command shell and type in:

```bash 
sudo apt-get install path/to/binaries
```

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

  # Configure ubuntu to allow the remote user to access it
  config.vm.provision :shell, path: "scripts/create_colord_pkla.sh"

  # Configure xrdp to correctly display desktop environment
  config.vm.provision :shell, inline: "sudo sed -i '4 i\\export XDG_CURRENT_DESKTOP=ubuntu:GNOME' /etc/xrdp/startwm.sh"
  config.vm.provision :shell, inline: "sudo sed -i '4 i\\export GNOME_SHELL_SESSION_MODE=ubuntu' /etc/xrdp/startwm.sh"
  config.vm.provision :shell, inline: "sudo sed -i '4 i\\export DESKTOP_SESSION=ubuntu' /etc/xrdp/startwm.sh"
  
  # Add desktop environment
  config.vm.provision :shell, inline: "sudo apt-get install -y --no-install-recommends ubuntu-desktop"
  config.vm.provision :shell, inline: "sudo apt-get install -y --no-install-recommends virtualbox-guest-dkms virtualbox-guest-utils virtualbox-guest-x11"
  
  # Add `vagrant` to Administrator
  config.vm.provision :shell, inline: "sudo usermod -a -G sudo vagrant"

  # Restart
  config.vm.provision :shell, inline: "sudo shutdown -r now"
  
end
```

`scripts/create_colord_pkla.sh`:
```bash
#!/bin/bash

# Set the target directory and file
target_dir="/etc/polkit-1/localauthority/50-local.d"
target_file="45-allow-colord.pkla"

# Check if the target directory exists, if not, create it
if [ ! -d "$target_dir" ]; then
    sudo mkdir -p "$target_dir"
fi

# Write the content to the target file
sudo tee "$target_dir/$target_file" > /dev/null << EOL
[Allow Colord all Users]
Identity=unix-user:*
Action=org.freedesktop.color-manager.create-device;org.freedesktop.color-manager.create-profile;org.freedesktop.color-manager.delete-device;org.freedesktop.color-manager.delete-profile;org.freedesktop.color-manager.modify-device;org.freedesktop.color-manager.modify-profile
ResultAny=no
ResultInactive=no
ResultActive=yes
EOL
```

To create the virtual machine enter:

```bash
vagrant up
```

This will start vagrant which will start up virtualbox and setup the virtual machine.

## Packer (Optional but Recommended)

This step is optional. Using the vagrant configuration file as is will get you the preconfigured virtual machine we need for this project, but doing this means that you would have to wait roughly 20mins everytime you spin up a new machine. If you want to avoid the wait you can create a new vagrant base box with everything we need preinstalled and configured. 

```hcl
variable "version" {
  default = "20230530.0.0"
}

source "vagrant" "csub_base" {
  source_path  = "ubuntu/bionic64"
  box_version = var.version
  communicator = "ssh"
  box_name = "csub_base"
}

build {
  sources = ["source.vagrant.csub_base"]

  provisioner "shell" {
    inline = [
      "sudo apt-get update -y",
      "sudo apt-get upgrade -y",
      "sudo apt-get install -y --no-install-recommends ubuntu-desktop",
      "sudo apt-get install -y --no-install-recommends virtualbox-guest-dkms virtualbox-guest-utils virtualbox-guest-x11",
      "sudo apt-get install -y xrdp",
      "sudo systemctl enable xrdp",
      "sudo systemctl start xrdp",
      "sudo usermod -a -G sudo vagrant",
    ]
  }

  provisioner "shell" {
    script = "scripts/create_colord_pkla.sh"
  }

  provisioner "shell" {
    inline = [
      "sudo sed -i '4 i\\export XDG_CURRENT_DESKTOP=ubuntu:GNOME' /etc/xrdp/startwm.sh",
      "sudo sed -i '4 i\\export GNOME_SHELL_SESSION_MODE=ubuntu' /etc/xrdp/startwm.sh",
      "sudo sed -i '4 i\\export DESKTOP_SESSION=ubuntu' /etc/xrdp/startwm.sh"
    ]
  }

  provisioner "shell" {
    expect_disconnect = true
    inline = [
      "sudo shutdown -r now",
    ]
  }
}
```

Run `packer build filename.pkr.hcl`. You should get folder called `output-csub_base` that will contain two files: `Vagrantfile` and `package.box`. Now run `vagrant box add csub_base ./output-csub_base/package.box`. 

Finally you can use vagrant to start up your preconfigured vm:

```bash
vagrant init csub_base
```

And then configure Vagrantfile. It should look like this:

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "csub_base"
  config.vm.provider :virtualbox do |v|
    v.memory = 4096
    v.name="ubuntu test machine"
  end

  config.vm.network "forwarded_port", guest: 3389, host: 3389, id: "rdp", auto_correct: true

  config.vm.network "private_network", ip: "<IP ADDRESS>"
  
end

```

# Connect the Virtual Machine to Guacamole