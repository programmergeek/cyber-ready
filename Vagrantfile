Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/bionic64"
  config.vm.box_version = "20230530.0.0"

  config.vm.provider :virtualbox do |v|
    v.gui = true
    v.memory = 2048
  end

  # Update repositories
  config.vm.provision :shell, inline: "sudo apt-get update -y"

  # Upgrade installed packages
  config.vm.provision :shell, inline: "sudo apt-get upgrade -y"

  # Add desktop environment
  config.vm.provision :shell, inline: "sudo apt-get install -y --no-install-recommends ubuntu-desktop"
  config.vm.provision :shell, inline: "sudo apt-get install -y --no-install-recommends virtualbox-guest-dkms virtualbox-guest-utils virtualbox-guest-x11"
  
  # Add `vagrant` to Administrator
  config.vm.provision :shell, inline: "sudo usermod -a -G sudo vagrant"

  # Restart
  config.vm.provision :shell, inline: "sudo shutdown -r now"
  
end
