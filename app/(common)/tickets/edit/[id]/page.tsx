import EditTicket from "@/app/components/edit-ticket";

export default function Page({ params }: { params: { id: string } }) {

    return (
        <>
        <EditTicket id={params.id} />
        </>
    )
}