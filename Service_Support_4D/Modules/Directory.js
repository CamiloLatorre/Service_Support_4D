
   var Directory = {
        that: this,
        user: " ",
        users: " ",
        Sync: function() {
            users = ds.USUARIOS.all(), users.forEach(function(a) {
                Directory.AddUser(a)
            })
        },
        AddUser: function(a) {
            var b = a.Adquirido,
                c = b.Nombre + " " + b.Apellido,
                d = directory.addUser(a.Nombre, a.Pass, c);
            switch (b.Cod_Tipo) {
            case 1:
                d.putInto("Clientes");
                break;
            case 2:
                d.putInto("Admin");
                break;
            case 3:
                d.putInto("FuturosClientes")
            }
            a.Habilitado || d.putInto("Disabled"), a.ID_Directory = d.ID, a.save(), directory.save()
        },
        UpdateUser: function(a) {
            user = directory.user(a.ID_Directory), user.name = a.Nombre;
            var b = a.Adquirido;
            user.fullName = b.Nombre + " " + b.Apellido;
            switch (b.Cod_Tipo) {
            case 1:
                user.putInto("Clientes");
                break;
            case 2:
                user.putInto("Admin");
                break;
            case 3:
                user.putInto("FuturosClientes")
            }
            a.Habilitado || user.putInto("Disabled"), directory.save()
        },
        SetPassword: function(a, b) {
            user = diretory.user(a), user.setPassword(b), directory.save()
        },
        DisbaleUser: function(a) {
            user = diretory.user(a), user.putInto("Disables")
        },
        SetGroup: function(a, b) {
            user = diretory.user(a), user.putInto(b)
        }
    };