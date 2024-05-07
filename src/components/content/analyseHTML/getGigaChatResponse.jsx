export const getGigaChatResponse = (wordList, elementsArray) => {
  fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
    method: 'POST',
    // maxBodyLength: Infinity,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Rquid: self.crypto.randomUUID().toString(),
      Authorization:
        'Basic MWY1OWNlYTctMjgwMi00ZDY5LTk0MzgtYjRlOTg2YWIwNjhmOmFjMmMwMjIzLTYwMGYtNGU2Ny05MjEyLTgxMDUwZGFlNTQwMw==',
    },
    body: new URLSearchParams({
      scope: 'GIGACHAT_API_PERS',
    }),
  })
    .then((response) => {
      console.log(response, 'gchat response')
      let data = JSON.stringify({
        model: 'GigaChat',
        messages: [
          {
            role: 'user',
            content: `Ты получишь два объекта. Твоя задача - найти все слова в тексте, которые подходят по контексту. У слова может существовать много категорий (смыслов), но твоя задача - использовать указанную. Слова и категории находятся в первом объекте, у которого ключами являются слова, необходимые для поиска, а их значениями - массив категорий. Во втором объекте значениями являются тексты, в которых ты должен искать указанные слова. Если текст содержит вхождение слова в нужном контексте, то ты отвечаешь "true". Если нет, то "false". В своем ответе верни объект, в котором ключом будет ключ из второго объхекта, а значением "true" или "false" (булевые) в зависимости от того, найдено ли слово в тексте или нет. Первый объект: ${JSON.stringify(wordList)}, второй объект: ${JSON.stringify(
              Object.assign(
                {},
                elementsArray.map((el) => el.textContent)
              )
            )}`,
          },
        ],
        temperature: 1,
        top_p: 0.1,
        n: 1,
        stream: false,
        max_tokens: 512,
        repetition_penalty: 1,
        update_interval: 0,
      })

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${response.access_token}`,
        },
        data: data,
      }
    })
    .then((response) => {
      console.log(JSON.stringify(response))
      return JSON.parse(response.choises[0].message.content)
    })
}
