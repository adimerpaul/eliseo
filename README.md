# Farmacia Eliseo

Sistema para la compra y venta de productos medicos de Farmacia Eliseo. Incluye gestion de inventario, ventas, compras, proveedores, pedidos, productos por vencer/vencidos, usuarios e integracion de facturacion/impuestos SIAT.

## Estructura

```text
front/   Aplicacion Quasar/Vue
back/    API Laravel
```

## Instalar dependencias del frontend

```bash
cd front
yarn
# or
npm install
```

## Ejecutar frontend en desarrollo

```bash
npm run dev
# or
quasar dev
```

## Ejecutar backend en desarrollo

```bash
cd back
composer install
php artisan serve
php artisan queue:listen
```

## Compilar frontend

```bash
cd front
npm run build
```
