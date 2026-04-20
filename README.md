# A5Display

Dashboard elegante e ultra-leve para iPad mini 1 (2012) - otimizado para Safari no iOS 9.

## 🎯 Objetivo

Transformar um iPad mini 1 parado em um display de parede funcional, mostrando:
- Relógio digital com data
- Clima em tempo real (São Paulo)
- Performance monitor (FPS, memória)
- Futuro: Agenda Google, notícias, Home Assistant

## 📱 Especificações do Hardware

- **Dispositivo:** iPad mini 1 (2012)
- **Chip:** Apple A5 (dual-core 1GHz)
- **RAM:** 512MB
- **Tela:** 1024×768 (7.9")
- **iOS Máximo:** 9.3.6
- **Safari:** iOS 9 WebKit (limitado a ES5, sem ES6+)

## 🏗️ Arquitetura

### Stack Tecnológico
- **HTML5** vanilla
- **CSS3** vanilla (sem frameworks)
- **JavaScript ES5** (compatibilidade iOS 9)
- **Zero dependências externas**

### Otimizações de Performance
- Viewport fixo 1024×768
- Animações apenas com `transform` e `opacity` (GPU-accelerated)
- Fontes system-only (San Francisco, Helvetica Neue)
- CSS containment para isolamento de repaints
- RequestAnimationFrame com throttling
- XMLHttpRequest ao invés de fetch API

## 📁 Estrutura

```
a5display/
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos otimizados
├── js/
│   ├── app.js             # Core + performance monitor
│   └── widgets/
│       ├── clock.js       # Relógio digital
│       └── weather.js     # Clima (Open-Meteo API)
└── README.md
```

## 🚀 Setup no iPad mini 1

### 1. Preparar o iPad
1. Conectar à mesma rede WiFi do servidor
2. Ajustar: **Settings > Display & Brightness > Auto-Lock > Never**
3. Opcional: Ativar **Guided Access** para kiosk mode

### 2. Servir o projeto

Opção A - Python simples (no servidor):
```bash
cd ~/projects/a5display
python -m SimpleHTTPServer 8080
```

Opção B - Node.js:
```bash
npx serve -p 8080
```

### 3. Acessar no iPad
1. Abrir Safari
2. Navegar para: `http://[IP-DO-SERVIDOR]:8080`
3. Adicionar à Home Screen (opcional)
4. Ativar Guided Access se quiser kiosk mode

## 🎨 Design

- **Tema:** Dark mode elegante
- **Cores:** Fundo #0a0a0a, texto branco com gradientes sutis
- **Layout:** Grid flexível, widgets com glassmorphism
- **Tipografia:** System fonts, pesos finos (200-300)

## 📊 Performance Monitor

O dashboard inclui um widget de performance mostrando:
- **FPS:** Frames por segundo (target: 60fps no iPad mini 1)
- **Memória:** Uso de heap JS em MB

## 🔮 Roadmap

### MVP (v1.0)
- [x] Relógio digital
- [x] Clima (Open-Meteo)
- [x] Performance monitor

### Próximas versões
- [ ] Agenda Google (integração GOG)
- [ ] Notícias RSS
- [ ] Home Assistant integration
- [ ] Configuração via interface
- [ ] Tema claro/escuro toggle

## 📝 Notas Técnicas

### Compatibilidade ES5
- Sem arrow functions: `function() {}` ao invés de `() => {}`
- Sem let/const: usar `var` apenas
- Sem template literals: concatenar strings com `+`
- Sem fetch API: usar `XMLHttpRequest`
- Sem Promises: usar callbacks

### Limitações do iOS 9 Safari
- Sem Service Workers (introduzidos no iOS 11)
- Sem WebAssembly
- Sem CSS Grid (usar flexbox)
- Sem CSS Variables (usar valores hardcoded)

## 🐛 Debug no iPad mini 1

1. Ativar Web Inspector: **Settings > Safari > Advanced > Web Inspector**
2. Conectar iPad ao Mac via USB
3. Abrir Safari no Mac > Develop > [nome do iPad]

## 📄 Licença

Projeto pessoal - uso livre.
