import type { ReactElement } from 'react'
import { Typography } from '@mui/material'
import SignOrExecuteForm from '@/components/tx/SignOrExecuteForm'
import { createRejectTx } from '@/services/tx/tx-sender'
import { useContext, useEffect } from 'react'
import { SafeTxContext } from '../../SafeTxProvider'
import { trackEvent } from '@/services/analytics'
import { TX_EVENTS, TX_TYPES } from '@/services/analytics/events/transactions'

type RejectTxProps = {
  txNonce: number
}

const onSubmit = () => {
  trackEvent({ ...TX_EVENTS.CREATE, label: TX_TYPES.rejection })
}

const RejectTx = ({ txNonce }: RejectTxProps): ReactElement => {
  const { setSafeTx, setSafeTxError, setNonce } = useContext(SafeTxContext)

  useEffect(() => {
    setNonce(txNonce)

    createRejectTx(txNonce).then(setSafeTx).catch(setSafeTxError)
  }, [txNonce, setNonce, setSafeTx, setSafeTxError])

  return (
    <SignOrExecuteForm onSubmit={onSubmit} isBatchable={false}>
      <Typography mb={2}>
        To reject the transaction, a separate rejection transaction will be created to replace the original one.
      </Typography>

      <Typography mb={2}>
        Transaction nonce: <b>{txNonce}</b>
      </Typography>

      <Typography mb={2}>
        You will need to confirm the rejection transaction with your currently connected wallet.
      </Typography>
    </SignOrExecuteForm>
  )
}

export default RejectTx
