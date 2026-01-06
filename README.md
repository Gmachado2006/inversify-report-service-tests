# Serviço HTTP com InversifyJS - Geração de Relatórios

##  Descrição
Sistema de geração e envio de relatórios fictícios implementado com Node.js, TypeScript e InversifyJS, demonstrando os princípios de Inversão de Dependência (DIP) e Inversão de Controle (IoC).

##  Arquitetura

### Camadas
1. **Domínio**: Interfaces e regras de negócio (sem dependências de infraestrutura)
2. **Infraestrutura**: Implementações concretas (Winston, Nodemailer)
3. **HTTP**: Adaptadores e controllers (Express)

### Princípios Aplicados
- **DIP (Dependency Inversion Principle)**: Módulos de alto nível não dependem de módulos de baixo nível
- **IoC (Inversion of Control)**: Container InversifyJS gerencia criação e injeção de dependências
- **Singleton**: Logger e Mailer compartilhados em toda aplicação
