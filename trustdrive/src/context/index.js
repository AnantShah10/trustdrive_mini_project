import { ManufacturerProvider } from './manufacturer_context'
import { TransporterProvider } from './transporter_context'
import { DistributorProvider } from './distributor_context'
import { VendorProvider } from './vendor_context'

const Providers = (props) => {
    return (
        <ManufacturerProvider>
        <TransporterProvider>
        <DistributorProvider>
        <VendorProvider>
            {props.children}
        </VendorProvider>
        </DistributorProvider>
        </TransporterProvider>
        </ManufacturerProvider>
    )
}

export default Providers