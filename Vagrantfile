$repo = <<-SCRIPT
echo \
"deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
"$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  SCRIPT

Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/bionic64"
  config.vm.box_version = "20230530.0.0"
  config.vm.network "public_network"

  config.vm.provider :virtualbox do |v|
    v.gui = true
    v.memory = 4096
    v.name="test_machine"
  end

  # Enable RDP
  config.vm.network "forwarded_port", guest: 3389, host: 3389, id: "rdp", auto_correct: true

  # Update repositories
  config.vm.provision :shell, inline: "sudo apt-get update -y"

  # Upgrade installed packages
  config.vm.provision :shell, inline: "sudo apt-get upgrade -y"

  # Add desktop environment
  config.vm.provision :shell, inline: "sudo apt-get install -y --no-install-recommends ubuntu-desktop"
  config.vm.provision :shell, inline: "sudo apt-get install -y --no-install-recommends virtualbox-guest-dkms virtualbox-guest-utils virtualbox-guest-x11"
  
  # Add `vagrant` to Administrator
  config.vm.provision :shell, inline: "sudo usermod -a -G sudo vagrant"

  # Install packages to allow apt to use a repository over HTTPS
  config.vm.provision :shell, inline: "sudo apt-get update -y"
  config.vm.provision :shell, inline: "sudo apt-get install ca-certificates curl gnupg"

  # Add Docker's official GPG key
  config.vm.provision :shell, inline: "sudo install -m 0755 -d /etc/apt/keyrings"
  config.vm.provision :shell, inline: "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker.gpg"
  config.vm.provision :shell, inline: "sudo chmod a+r /etc/apt/keyrings/docker.gpg"

  # Setup the repository
  config.vm.provision :shell, inline: $repo

  # Update the package index
  config.vm.provision :shell, inline: "sudo apt-get update -y"

  # Install the latest version of docker
  config.vm.provision :shell, inline: "sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin"

  # Restart
  config.vm.provision :shell, inline: "sudo shutdown -r now"
  
end
