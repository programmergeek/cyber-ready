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
