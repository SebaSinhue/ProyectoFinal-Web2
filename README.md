# Proyecto Final – Programación Web 2

Aplicación web tipo **CRUD** desarrollada con **Node.js, Express, MySQL y EJS**.

Permite:

- Registrar usuarios.
- Iniciar sesión con usuario y contraseña.
- Administrar una lista de registros (nombre y correo).
- Crear, leer, editar y eliminar registros (CRUD) solo si el usuario está autenticado.

---
## Estructura del proyecto (resumen)

```text
ProyectoFinal-Web2/
├── db/             # Script SQL y configuración de la base de datos
├── public/         # Archivos estáticos (CSS y JS del lado del cliente)
├── routes/         # Rutas de acceso (login/registro) y CRUD de la lista
├── views/          # Vistas EJS (login, registro y panel principal)
├── app.js          # Punto de entrada del servidor Express
├── package.json    # Dependencias y scripts de npm
├── package-lock.json
├── .gitignore      # Archivos/carpeta que no se suben al repo
└── README.md       # Este archivo
