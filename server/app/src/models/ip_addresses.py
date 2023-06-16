import sqlite3

def db_init() -> sqlite3.Connection:
    conn = sqlite3.connect('ip_address.db')
    cur = conn.cursor()
    cur.close()
    return conn

def create_table(conn: sqlite3.Connection) -> None:
    cur = conn.cursor()
    cur.execute("CREATE TABLE ip_addresses(address VARCHAR(15) PRIMARY KEY, is_assigned)")
    cur.close()
    cur.close()
    conn.close()

def add_addresses(addresses:list[str]) -> None:
    conn = db_init()
    cur = conn.cursor()
    data = [(address, 0) for address in addresses]
    cur.executemany("INSERT INTO ip_addresses VALUES(?, ?)", data)
    conn.commit()
    conn.close()
    

def assign_new_address() -> str:
    conn = db_init()
    cur = conn.cursor()
    ip_address = [address for address in cur.execute('SELECT address FROM ip_addresses WHERE is_assigned=0 LIMIT 1')][0][0]
    cur.execute("UPDATE ip_addresses SET is_assigned=1 WHERE address=?", (ip_address,))
    conn.commit()
    cur.close()
    conn.close()
    return ip_address