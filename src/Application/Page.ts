/// <amd-module name="Application/Page" />

/**
 * Библиотека управления страницей. Например, ее заголовок, список загруженных ресурсов или og описание
 *
 * @library Application/Page
 * @public
 * @includes Head Application/_Page/Head
 * @includes IHead Application/_Page/_head/IHead
 * @includes IInternalHead Application/_Page/_head/IInternalHead
 * @author Печеркин С.В.
 */
export { Head } from "Application/_Page/Head";
export { Body } from "Application/_Page/Body";
export { JSLinks } from "Application/_Page/JSLinks";
export * from 'Application/_Page/_head/IHead';
export * from 'Application/_Page/_jslinks/IJSLinks';
export * from 'Application/_Page/_body/IBody';
export { IInternalHead, IHead } from 'Application/_Page/_head/IHead';
export { IJSLinksInternal, IJSLinks } from 'Application/_Page/_jslinks/IJSLinks';
export { IInternalBody, IBody } from 'Application/_Page/_body/IBody';
