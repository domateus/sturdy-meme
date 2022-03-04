A estrutura de pastas está apresentada abaixo, com alguns comentários

```
+-- config /* Pasta de configurações */
|   --- config.js
|   --- router-factory.js
|   --- swagger.js
+-- data /* Mocks e sqls */
+-- src /* sources */
|   +-- helper
|       --- security /* autenticação */
|   +-- module /* os módulos são separações por projetos ou funcionalidades macro como no exemplo abaixo*/
|       +-- core /* coisas gerais, que servem para todos os projetos */
|           +-- api/v1 /* v1 é a versão, pode ser outro valor */
|               +-- rest /* restfull api */
|               +-- rpc /* remote procedure call */
|           +-- config
|               +-- database.js /* configuração da base para os módulos, mas pode ser assumido um config geral */
|           +-- controller /* controllers para tudo que não se enquadrar como uma api rest ou rpc, como por exemplo, retorno de html */
|           +-- model /* models ORM mapeando as tabelas */
|           +-- provider /* providers de filas, por exemplo */
|           +-- query /* query para queries de máximo desempenho e complexas que o ORM não atenda a coontento */
|           +-- service /* services que serão invocados pelos controllers */
|           +-- test /* testes automatizados */
|           +-- validator /* validators */
|       +-- tarefas /* projeto neokohm */
+-- tmp
+-- index.js
```