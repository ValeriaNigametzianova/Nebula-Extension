import OpenAI from 'openai'
import React, { useEffect, useState } from 'react'

export const Scripts = () => {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  const elems = document.body.getElementsByTagName('*')
  const images = document.body.getElementsByTagName('img')

  //   for (let i = 0; i < elems.length; i++) {
  //     if (elems[i].innerText) elems[i].style.backgroundColor = `#52dc02`
  //   }

  for (let i = 0; i < images.length; i++) {
    images[i].style.filter = `blur(50px)`
  }
  return (
    <div
      onClick={async () => {
        // const image = await openai.images.generate({ model: 'dall-e-2', prompt: 'A cute baby sea otter' })
        const text = await openai.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: `
              Следующий текст содержит спойлеры к Наруто? Ответь только true или false.

              Однако Какаши, выбранный членом альянса пяти деревень ниндзя, едва не становится Шестым Хокаге (хоть, по собственному признанию, не стремился к этому титулу и считает, что есть люди, более достойные его), однако, перед его официальным назначением предыдущий правитель, Пятая Хокаге Цунаде приходит в себя.`,
            },
          ],
          model: 'gpt-3.5-turbo',
        })
        console.log(text)
      }}
    >
      AHAHAHAHAHHA
    </div>
  )
}
