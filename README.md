# Небула

Расширение предназначено для маскировки неприемлемого контента в Интернете. Работает во всех браузерах на движке Chromium. Неприемлемым контентом может считаться все, что вам не нравится: спойлеры, новости и пр.

Расширение использует XPath для поиска ключевых слов на активных веб-страницах в браузере. Алгоритм поиска включает в себя создание стемм и транслитераций для добавленных слов. Поиск вхождений ключевых слов происходит с помощью XPath. Алгоритм обработки найденных текстов может работать с использованием нейросети и без нее. При отключенном использовании нейросети маскируются все найденные тексты, при включенном - тексты отправляются на обработку в нейросеть для получения контекста употребления ключевого слова. При таком подходе маскируются тексты, соответствующие категории слова.

Нейросеть подключается **самостоятельно**: на выбор дается ChatGPT и GigaChat, для каждой из них необходимо ввести ключ доступа. Ключ для ChatGPT можно получить в [личном кабинете OpenAI](https://platform.openai.com/api-keys), для GigaChat в [личном кабинете DevelopersSber](https://developers.sber.ru/docs/ru/gigachat/individuals-quickstart).

Все введенные данные находятся в синхронизируемом хранилище браузера локально на вашем компьютере.

Ниже даны инстуркции по установке расширения для различных браузеров:

1. [Chrome](#порядок-установки-расширения-в-Chrome)
2. [Opera](#порядок-установки-расширения-в-opera)
3. [Яндекс Браузер](#порядок-установки-расширения-в-Яндекс-Браузере)

### Порядок установки расширения в Chrome:

1. Скачать и разархивировать билд Build-Nebula-Extension.zip из последнего [релиза](https://github.com/ValeriaNigametzianova/Nebula-Extension/releases/tag/Nebula-Extension-v1.1.1);
2. Перейти в "Управление расширениями" ("Manage extensions");

   ![image](https://github.com/ValeriaNigametzianova/Nebula-Extension/assets/71436617/528cf43c-ec5b-4589-b747-69f5f6692b10)

3. Включить режим разработчика ("Developer mode");

   ![image](https://github.com/ValeriaNigametzianova/Nebula-Extension/assets/71436617/38b4e00f-6893-40aa-a130-1dd9d2c6738b)

4. Нажать "Загрузить распакованное расширение" ("Load unpacked") и выбрать разархивированную папку;

   ![image](https://github.com/ValeriaNigametzianova/Nebula-Extension/assets/71436617/d6d2e7e4-771b-4b50-a19c-d69f3431eb94)

5. После установки откроется видео-инструкция по использованию, изучите и пользуйтесь.

### Порядок установки расширения в Opera:

1. Скачать билд Nebula-Extension.crx из последнего [релиза](https://github.com/ValeriaNigametzianova/Nebula-Extension/releases/tag/Nebula-Extension-v1.1.1);
2. Перейти в "Управление расширениями" ("Manage extensions");

   ![image](https://github.com/ValeriaNigametzianova/Nebula-Extension/assets/71436617/676ea0ea-c7ba-4bc9-8abf-0d75a74932ef)

3. Перетащить Nebula-Extension.crx в зону расширений;

   ![image](https://github.com/ValeriaNigametzianova/Nebula-Extension/assets/71436617/b32df09e-2ea9-436e-92da-e536d3f42bf3)

4. Нажать на кнопку "Установить" ("Install") и подтвердить действие;

   ![image](https://github.com/ValeriaNigametzianova/Nebula-Extension/assets/71436617/f61902a6-1a17-4a97-b35d-b608dad50a62)

5. После установки откроется видео-инструкция по использованию, изучите и пользуйтесь;
6. Если возникнут какие-либо проблемы, то см. инструкцию по установке для Chrome.

### Порядок установки расширения в Яндекс Браузере:

1. Скачать билд Nebula-Extension.crx из последнего [релиза](https://github.com/ValeriaNigametzianova/Nebula-Extension/releases/tag/Nebula-Extension-v1.1.1);
2. Перейти в "Управление расширениями" ("Manage extensions");

   ![image](https://github.com/ValeriaNigametzianova/Nebula-Extension/assets/71436617/42bcd0b3-718b-4218-b707-84aa033f0df5)

3. Перетащить Nebula-Extension.crx в зону расширений;

   ![image](https://github.com/ValeriaNigametzianova/Nebula-Extension/assets/71436617/ae770e83-9400-48c5-90ac-b87948cf624e)

4. Нажать на кнопку "Установить";

   ![image](https://github.com/ValeriaNigametzianova/Nebula-Extension/assets/71436617/96a287b9-cb58-41f1-b18b-50a44e57c1c7)

5. После установки откроется видео-инструкция по использованию, изучите и пользуйтесь;
6. Если возникнут какие-либо проблемы, то см. инструкцию по установке для Chrome. Для перехода в "Управление расширениями" следует в адресной строке ввести browser://extensions/, дальше - по инструкции.

   ![image](https://github.com/ValeriaNigametzianova/Nebula-Extension/assets/71436617/fcbb742e-f63f-400e-9190-54d402145b7b)
