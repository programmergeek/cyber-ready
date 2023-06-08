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
