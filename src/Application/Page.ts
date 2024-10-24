/**
 * Библиотека управления страницей. Например, ее заголовок, список загруженных ресурсов или og описание
 * @library
 * @public
 * @author Печеркин С.В.
 * @module
 */
export { Head } from 'Application/_Page/Head';
export { Body } from 'Application/_Page/Body';
export { JSLinks } from 'Application/_Page/JSLinks';
export * from 'Application/_Page/_pageTagAPI/Interface';
export * from 'Application/_Page/_body/IBody';
export { IPageTagAPI } from 'Application/_Page/_pageTagAPI/Interface';
export { IBody } from 'Application/_Page/_body/IBody';
export * as creators from 'Application/_Page/creators';
