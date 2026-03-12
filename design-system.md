# Design System — Mobile App UI

Este documento descreve o sistema de design utilizado na aplicação mobile.  
A interface é baseada em **tema escuro com gradientes azuis**, **cards elevados**, **sombras suaves** e **elementos com aparência glass/neumorphism**.

O objetivo é criar uma interface moderna, elegante e focada em **legibilidade e hierarquia visual clara**.

---

# 1. Filosofia de Design

Princípios principais:

- Dark UI first
- Alto contraste para legibilidade
- Gradientes azuis como cor principal
- Cards elevados com sombras suaves
- Componentes com bordas arredondadas
- Uso moderado de brilho (glow) em botões ativos
- Interface focada em mobile

Estilo visual:

- **Dark Neumorphism**
- **Soft shadows**
- **Glass-like cards**
- **Rounded UI**

---

# 2. Paleta de Cores

## Cores principais

Primary Blue Gradient:


#2F80ED
#3A8DFF
#5AA6FF


Utilizado em:

- botões principais
- elementos ativos
- indicadores
- highlights

---

## Fundo principal


#0F1722
#141C28
#1A2332


Utilizado em:

- background do app
- telas principais
- containers grandes

---

## Cards


#1C2533
#222C3D


Utilizado em:

- cards de conteúdo
- listas
- produtos
- chat bubbles

---

## Texto

Primary text


#FFFFFF


Secondary text


#A8B3C7


Muted text


#6E7B8F


---

## Bordas e divisores


#2C3648


---

# 3. Gradientes

Gradiente principal:


linear-gradient(135deg, #2F80ED 0%, #3A8DFF 50%, #5AA6FF 100%)


Usado em:

- botões principais
- highlights
- backgrounds de cards especiais

---

# 4. Tipografia

Fonte recomendada:


Inter


Alternativas:


SF Pro
Roboto


---

## Hierarquia

### Título principal


font-size: 24px
font-weight: 600
color: #FFFFFF


### Título de seção


font-size: 18px
font-weight: 500
color: #FFFFFF


### Texto padrão


font-size: 14px
color: #A8B3C7


### Texto pequeno


font-size: 12px
color: #6E7B8F


---

# 5. Bordas

Elementos possuem **bordas arredondadas grandes**.

### Cards


border-radius: 20px


### Botões


border-radius: 14px


### Inputs


border-radius: 12px


### Ícones


border-radius: 10px


---

# 6. Sombras (Neumorphism)

Sombra padrão de card:


box-shadow:
0 10px 25px rgba(0,0,0,0.4),
0 2px 6px rgba(0,0,0,0.3);


---

Glow para elementos ativos:


box-shadow:
0 0 20px rgba(58,141,255,0.5);


---

# 7. Botões

## Botão primário

Background:


gradient blue


Texto:


#FFFFFF


Altura:


48px


Radius:


14px


---

## Botão secundário

Background:


#222C3D


Texto:


#A8B3C7


---

# 8. Cards

Cards possuem aparência elevada.

Estrutura:


padding: 16px
border-radius: 20px
background: #1C2533


Sombras suaves.

---

# 9. Ícones

Estilo:

- simples
- minimalista
- monocromático

Cor padrão:


#A8B3C7


Ativo:


#3A8DFF


---

# 10. Navegação

Bottom Navigation padrão:

Altura:


70px


Background:


#141C28


Ícone ativo:


#3A8DFF


Ícone inativo:


#6E7B8F


---

# 11. Espaçamento

Sistema baseado em múltiplos de 8.


4px
8px
16px
24px
32px
40px


---

# 12. Layout Mobile

Padding lateral padrão:


16px


Grid:


1 column


ou


2 columns para cards pequenos


---

# 13. Animações

Animações devem ser suaves.

Duração padrão:


200ms


Curva:


ease-in-out


Exemplos:

- hover de botão
- seleção de item
- abertura de card
- mudança de tela

---

# 14. Estilo Geral

A interface deve transmitir:

- modernidade
- tecnologia
- simplicidade
- foco no conteúdo

Evitar:

- excesso de cores
- bordas duras
- sombras muito fortes

---

# 15. Inspiração Visual

O design segue conceitos de:

- Dark UI
- Neumorphism
- Soft gradients
- Mobile first design

