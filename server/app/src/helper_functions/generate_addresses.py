import ipaddress

def generate_addresses(address:str):
    addressesObjects = list(ipaddress.IPv4Network(address).hosts())
    addresses = [str(address) for address in addressesObjects]
    return addresses
