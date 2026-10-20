# Instalacje
node -v
v24.15.0

npm -v
11.12.1

git -v
git version 2.40.1.windows.1

# GIT
Ctrl+Shift+P -> Clone -> URL -> ... -> Open window

https://github.com/ev45ive/infoshare-postdata-angular-design-architecture.git

# Angular CLI
npm i -g @angular/cli@latest

ng version
ng help

Angular CLI : 22.2.2

ng new --help

ng new postdata  
    --directory "." 
    -s 
    -t false  
    --routing   
    --skip-install  
    -S 
    --ssr false 
    --standalone 
    --strict  
    --style scss  
    --zoneless true  
    --ai-config vscode 



# App Structure Outline

```
src/app/
    - routing.ts
    - main.ts

    - core/
        - auth
        - api
        - tokens
        - config
        - ... 

    - features/
        - deals/
            - pages/    # logical / routed
            - ui/       # presentation
            - model/
        - contacts/
            - ...
        - <feature_name>/
            - .../  

    - shared/
        - ui/
        - utils/
```


# Storybook vs angular 22
npm i --legacy-peer-deps

# Storybook 
npm run storybook


# Design Tokens

https://m3.material.io/foundations/design-tokens/overview
https://v21.primeng.org/theming/styled#architecture

# @Input -> input() signal
https://angular.dev/reference/migrations/signal-inputs


# Flex
https://css-tricks.com/snippets/css/a-guide-to-flexbox/

http://www.flexboxdefense.com/
https://flexboxfroggy.com/


# CSS GRID
https://css-tricks.com/complete-guide-css-grid-layout/
https://cssgridgarden.com/


# Gestalt - CSS has meaning
https://ixdf.org/literature/topics/gestalt-principles

# CSS Specifity
https://css-tricks.com/specifics-on-css-specificity/ 

# CSS Selectors
https://flukeout.github.io/


# CSS 2022 Selectors
https://css-tricks.com/what-css-do-you-absolutely-have-to-know-in-2022/

https://caniuse.com/?search=container

https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries

https://web-platform-dx.github.io/baseline/

https://tailwindcss.com/docs/responsive-design#container-queries

https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state

### Key CSS Selectors & Features Highlighted in 2022

• :has() (Relational Pseudo-Class): Allows you to select a parent or ancestor element based on its children or descendants (e.g., div:has(> p.red)).

• :is() and :where(): Forgiving selector lists that simplify repetitive selector groupings and manage specificity (:is() matches the highest specificity of its arguments, while :where() has zero specificity).

• Cascade Layers (@layer): Reached baseline/interop consensus in 2022, helping developers explicitly control and organize specificity layers without relying on messy selector workarounds.

• Container Queries (@container): Shipped across major browsers in 2022, allowing component-level responsiveness based on the parent container's size rather than the viewport.



# CSS zen garden

https://csszengarden.com/219/

2000:
- CSS  - Presentation
- HTML - Semantic model Model  
- JS   - Interactions

2010
- JS
- Templates
- CSS

2020
- Services/Hooks (Angular/React)
- Components (Angular)
- Utilities (Tailwind)
