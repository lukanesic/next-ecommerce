import bcrypt from 'bcrypt'

export const users = [
  {
    name: 'Mike Tyson',
    email: 'mike@example.com',
    password: bcrypt.hashSync('1231231', 10),
    role: 'admin',
    address: 'Hell Kitchen, NY, USA',
  },
  {
    name: 'Travis Scottt',
    email: 'travis@example.com',
    password: bcrypt.hashSync('1231231', 10),
    role: 'customer',
    address: 'Houstonfornication, Texas, USA',
  },
]
