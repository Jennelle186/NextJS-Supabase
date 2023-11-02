import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import EditWaterStationInformation from './waterStationEditForm'
import { redirect } from 'next/navigation'

interface station_id {
  params: {id: number}
}

export default async function EditWaterStation(props: station_id) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if(!session){
    redirect('/login')
  }

  return  <EditWaterStationInformation id = {props.params.id}/>
}