///// <amd-module name="Application/_Page/_body/ElementPS" />

/**
 * Класс, которые непосредственно управляет тегом <body> на сервере
 * @author Печеркин С.В.
 */
export default class ElementPS {
   protected readonly _attrs = {
      'class':  ''
   }

   /**
    * Аналог метода contains для DOMTokenList у <body>
    * @see DOMTokenList
    * @param token
    */
   containsClass(token: string): boolean {
      return this._attrs.class.includes(token);
   }

   /**
    * Аналог метода toString для DOMTokenList у <body>
    * @see DOMTokenList
    */
   getClasses(): string {
      return this._attrs.class
   }

   /**
    * Аналог метода toggle для DOMTokenList у <body>
    * @see DOMTokenList
    * @param token
    * @param force
    */
   toggleClass(token: string, force?: boolean): boolean {
      const needAdd: boolean = (force === undefined) ? !this.containsClass(token) : force;
      needAdd ? this.updateClasses([], [token]) : this.updateClasses( [token], []);

      return this.containsClass(token);
   }

   /**
    * Аналог метода replace для DOMTokenList у <body>
    * @see DOMTokenList
    * @param initialRemoveList
    * @param initialAddList
    */
   updateClasses(initialRemoveList: string[], initialAddList: string[]): void {
      const removeList = ElementPS.prepareTokens(initialRemoveList);
      const addList = ElementPS.prepareTokens(initialAddList);

      let list: string[] = ElementPS.prepareTokens(this.getClasses().split(' '));
      list = list.filter((item) => !removeList.includes(item));
      list = list.concat(addList.filter((item) => !list.includes(item)));

      this._attrs.class = list.join(' ');
   }

   /**
    * Токены классов нужно достаточно сильно фильтровать, иначе упадут нативные методы браузеров
    * Нельзя пропускать дальше пустые строки и строки с пробелами
    * @param tokens
    * @protected
    */
   protected static prepareTokens(tokens: string[]): string[] {
      const result: string[] = [];

      tokens.forEach((token) => {
         if (!!token) {
            result.push(token.trim());
         }
      })

      return result;
   }
}
