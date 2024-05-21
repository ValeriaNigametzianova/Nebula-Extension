import React, { useEffect, useState } from 'react'
import { SmallToggleButton } from '../components/SmallToggleButton'
import { NeuronetAdder } from '../components/NeuronetAdder'

export const NeuronetSettings = () => {
  const [useNeuronet, setUseNeuronet] = useState(false)

  useEffect(() => {
    chrome.storage.sync.get().then((storage) => {
      console.log(123, storage)
      setUseNeuronet(storage.use_neuronet)
    })
  }, [])

  const toggleHandler = (value) => {
    setUseNeuronet(value)
    chrome.storage.sync.set({
      use_neuronet: value,
    })
  }

  return (
    <div className="add_neuronet_section">
      <div className="header">
        <div className="subtitle">
          Использование нейросети при анализе страниц
        </div>
        <SmallToggleButton
          className={'show_word'}
          value={useNeuronet}
          setValue={toggleHandler}
        />
      </div>

      <NeuronetAdder useNeuronet={useNeuronet} />
    </div>
  )
}
