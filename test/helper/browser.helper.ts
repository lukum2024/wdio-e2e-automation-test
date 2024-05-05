import  log4js from "log4js"

const logger = log4js.getLogger("BrowserHelper");

 export class BrowserHelper {
  static navigateTo = async (url: string): Promise<void> => {
    //logger.debug("**Framework: Browser navigate to " + url);
    await browser.navigateTo(url);
    await browser.maximizeWindow()
  };

  static refreshBrowser = async (): Promise<void> => {
    logger.debug("**Framework: Refreshing browser");
    await browser.refresh();
  };

  static browserGoBack = async (): Promise<void> => {
    logger.debug("**Framework: Go back");
    await browser.back();
  };

  static browserGoForward = async (): Promise<void> => {
    logger.debug("**Framework: Go forward");
    await browser.forward();
  };

  static reloadSession = async (): Promise<void> => {
    logger.debug("**Framework: Restarting browser");
    await browser.reloadSession();
  };

  static executeScript = async (
    script: string,
    ...args: any
  ): Promise<void> => {
    logger.debug("**Framework: Executing script");
    await browser.execute(script, args);
  };

  static getLocalStorage = async (): Promise<void> => {
    logger.debug(`**Framework: Getting all local storage`);
    await browser.getLocalStorage();
  };

  static setLocalStorage = async (
    key: string,
    value: string,
  ): Promise<void> => {
    logger.debug(
      `**Framework: Setting local storage with key: ${key}, value: ${value}`,
    );
    await browser.setLocalStorage(key, value);
  };

  static getLocalStorageItem = async (key: string): Promise<void> => {
    logger.debug(`**Framework: Getting local storage item with key: ${key}`);
    await browser.getLocalStorageItem(key);
  };

  static clearLocalStorage = async (): Promise<void> => {
    logger.debug(`**Framework: Clearing local storage`);
    await browser.clearLocalStorage();
  };

  static async getWindowTitle(): Promise<string> {
    logger.debug(`**Framework: Getting window title`);
    return await browser.getTitle();
  }

  static async getWindowHandles(): Promise<string[]> {
    logger.debug(`**Framework: Getting window handles`);
    return await browser.getWindowHandles();
  }

  static async getWindowHandle(): Promise<string> {
    logger.debug(`**Framework: Getting window handle`);
    return await browser.getWindowHandle();
  }

  static async switchToWindow(windowHandle: string): Promise<void> {
    logger.debug(`**Framework: Switching to window`);
    await browser.switchToWindow(windowHandle);
  }

  static async closeWindow(): Promise<void> {
    logger.debug(`**Framework: Close current browser tab`);
    await browser.closeWindow();
  }

  static async getPageSource(): Promise<string> {
    logger.debug(`**Framework: Getting page source`);
    return await browser.getPageSource();
  }

  static async getWindowUrl(): Promise<string> {
    logger.debug(`**Framework: Getting current window url`);
    return await browser.getUrl();
  }

  static async switchToFrame(frameId: number): Promise<void> {
    await browser.switchToFrame(frameId);
  }

  static async switchToParentFrame(): Promise<void> {
    await browser.switchToParentFrame();
  }

  static async keys(keys: string | string[]): Promise<void> {
    await browser.keys(keys);
  }

  static async hover(element): Promise<void> {
    await element.moveTo();
  }

  static async hasVerticalScrollBar(viewSelector: string): Promise<boolean> {
    return await browser.execute((v) => {
      let element = document.querySelector(v);
      return element === null
        ? false
        : element.scrollHeight > element.clientHeight;
    }, viewSelector);
  }

  static async hasHorizontalScrollBar(
    viewSelector: string,
    tableSelector?: string,
  ): Promise<boolean> {
    if (tableSelector) {
      return await browser.execute(
        (v, t) => {
          let viewElement = document.querySelector(v);
          let tableElement = document.querySelector(t);
          if (viewElement === null || tableElement === null) {
            return false;
          }
          return tableElement.scrollWidth > viewElement.clientWidth;
        },
        viewSelector,
        tableSelector,
      );
    } else {
      return await browser.execute((v) => {
        let element = document.querySelector(v);
        return element === null
          ? false
          : element.scrollWidth > element.clientWidth;
      }, viewSelector);
    }
  }
}

