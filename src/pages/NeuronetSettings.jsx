import React, { useEffect, useState } from 'react'
import { SmallToggleButton } from '../components/SmallToggleButton'
import { NeuronetAdder } from '../components/NeuronetAdder'

export const NeuronetSettings = () => {
  const [useNeuronet, setUseNeuronet] = useState(false)

  useEffect(() => {
    chrome.storage.sync.get().then((storage) => {
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
    <div className="nebula_add_neuronet_section">
      <div className="nebula_header">
        <div className="nebula_subtitle">
          Использование нейросети при анализе страниц
        </div>
        <SmallToggleButton
          className={'nebula_show_word'}
          value={useNeuronet}
          setValue={toggleHandler}
        />
      </div>

      <NeuronetAdder useNeuronet={useNeuronet} />
    </div>
  )
}
