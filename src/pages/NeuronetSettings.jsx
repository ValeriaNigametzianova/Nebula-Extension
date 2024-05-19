import React, { useState } from 'react'
import { SmallToggleButton } from '../components/SmallToggleButton'
import { DropdownMenu } from '../components/DropdownMenu'

export const NeuronetSettings = () => {
  const [chooseNeuronet, setchooseNeuronet] = useState('')
  return (
    <div className="add_word_section">
      <div className="subtitle">
        Использование нейросети при анализе страниц
      </div>
      <SmallToggleButton
        title={'Использовать нейросеть'}
        className={'show_word'}
      />
      <DropdownMenu
        onClick={setchooseNeuronet}
        defaultOption={'Выберите нейросеть'}
        option_1={'ChatGPT'}
        option_2={'GigaChat'}
      />
    </div>
  )
}
