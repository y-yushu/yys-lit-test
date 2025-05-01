/**
 * 动态加载并注册语言模块
 * @param language 要加载的语言名称
 */
export declare function registerLanguage(language: string): Promise<void>;
/**
 * 检查语言是否已注册
 * @param language 要检查的语言名称
 * @returns 是否已注册
 */
export declare function isLanguageRegistered(language: string): boolean;
