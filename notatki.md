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