import ClientOnly from '@/components/ClientOnly'
import Messenger from '@/components/messenger/Messenger'
import React from 'react'

function messenger() {
  return (
    <div>
        <ClientOnly>

                    <Messenger/>

        </ClientOnly>
    </div>
  )
}

export default messenger