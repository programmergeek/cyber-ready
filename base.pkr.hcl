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
    expect_disconnect = true
    inline = [
      "sudo shutdown -r now",
    ]
  }
}
