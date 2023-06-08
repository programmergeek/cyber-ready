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

  # Authorize remote access on ubuntu
  config.vm.provision :shell, path: "scripts/create_colord_pkla.sh"
  
  # Configure xrdp to work well with the ubuntu desktop
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
