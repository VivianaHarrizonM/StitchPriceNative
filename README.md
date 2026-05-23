# StitchPrice 🧶

Calculadora de precios para proyectos de crochet y tejido. App nativa para iOS y Android construida con **React Native + Expo**.

---

## Requisitos

- Node.js 18 o superior
- npm o yarn
- Expo CLI (se instala automáticamente)
- Para probar en físico: App **Expo Go** en tu celular ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

---

## Instalación

```bash
# 1. Entra a la carpeta
cd StitchPrice

# 2. Instala dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm start
```

Esto abre el **Expo Dev Tools** en tu navegador y muestra un QR en la terminal.

---

## Cómo probar

### En tu celular (más fácil)
1. Instala **Expo Go** en tu celular
2. Escanea el QR que aparece en la terminal con la cámara (iOS) o con Expo Go (Android)
3. La app abre directamente 🎉

### En un emulador Android
```bash
npm run android
# Requiere Android Studio con un emulador configurado
```

### En simulador iOS (solo Mac)
```bash
npm run ios
# Requiere Xcode instalado
```

---

## Estructura del proyecto

```
StitchPrice/
├── app/
│   ├── _layout.tsx        # Layout raíz (navegación)
│   └── index.tsx          # Pantalla principal (calculadora)
├── components/
│   ├── StyledInput.tsx    # Input reutilizable con label
│   ├── SectionHeader.tsx  # Separador de secciones
│   └── ResultRow.tsx      # Fila de resultado
├── constants/
│   └── theme.ts           # Colores y monedas
├── app.json               # Configuración de Expo
└── package.json
```

---

## Publicar en tiendas (producción)

### Crear build con EAS (recomendado)

```bash
# Instala EAS CLI
npm install -g eas-cli

# Inicia sesión en tu cuenta Expo
eas login

# Configura el proyecto
eas build:configure

# Build para Android (.apk para pruebas o .aab para Play Store)
eas build --platform android

# Build para iOS (requiere cuenta de Apple Developer)
eas build --platform ios
```

---

## Características

- ✅ Cálculo de madejas necesarias
- ✅ Costo de materiales + extras
- ✅ Mano de obra por hora
- ✅ Ganancia configurable (con botones rápidos 10/20/30/50%)
- ✅ 8 monedas: MXN, USD, EUR, COP, ARS, PEN, CLP, BRL
- ✅ Diseño limpio con colores de marca
- ✅ Funciona 100% offline (sin internet)
