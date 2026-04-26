# Estructura de carpetas (Feature-First)

Esta estructura separa lo global (`app`, `shared`) de lo especifico de negocio (`features`).

## Arbol recomendado

```text
src/
  app/                  # Configuracion global (providers, bootstrap)
    providers/

  shared/               # Recursos reutilizables entre features
    api/                # Cliente HTTP, interceptores, endpoints globales
    ui/                 # Componentes UI reutilizables
    utils/              # Helpers y funciones auxiliares
    constants/          # Constantes globales

  features/             # Modulos por dominio
    alumnos/
      components/
      pages/
      services/
      hooks/
    materias/
      components/
      pages/
      services/
      hooks/
    semestres/
      components/
      pages/
      services/
      hooks/

  pages/                # Paginas de alto nivel (si no pertenecen a una feature)
  layouts/              # Layouts compartidos (Navbar, Sidebar, etc.)
  routes/               # Definicion de rutas

  main.jsx              # Punto de entrada
```

## Regla practica

- Si algo se usa en mas de una feature, va a `shared/`.
- Si algo pertenece a un dominio especifico, va en `features/<dominio>/`.
- Evita que una feature dependa directamente de otra; comparte por `shared/`.

## Nota

Se eliminaron carpetas legacy de compatibilidad para mantener la estructura alineada al esquema por dominios.
