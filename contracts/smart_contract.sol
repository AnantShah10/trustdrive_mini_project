// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract ProductDetails {
    address public manufacturer;
    address public transporter;
    address public vendor;
    address public distributor;
    bool public isTransported;
    bool public isDistributed;
    bool public isVendored;
    bool public isGenuine;
    bytes32 private manufacturerHash;
    bytes32 private transporterHash;
    bytes32 private distributorHash;
    bytes32 private vendorHash;

    struct New_Product {
        string manufacturername;
        string manufacturingdate;
        string productid;
        string productname;
        string productdetails;
        string totransportername;
    }

    struct Transport_Product {
        string transportername;
        string transportingdate;
        string productid;
        string productname;
        string tranportingaddress;
        string todistributorname;
    }

    struct Distribute_Product {
        string distributorname;
        string distributingdate;
        string productid;
        string productname;
        string addressofvendor;
        string tovendorname;
    }

    struct Vendor_Product {
        string vendorname;
        string vendorlocation;
        string productid;
        string productname;
    }

    mapping(uint => New_Product) products;
    mapping(uint => Transport_Product) transports;
    mapping(uint => Distribute_Product) distributes;
    mapping(uint => Vendor_Product) vendors;
    mapping(string => bytes32) productidHash;
   
    modifier onlymanufacturer {
        require(msg.sender == manufacturer);
          _;
    }
    modifier onlytransporter {
        require(msg.sender == transporter);
          _;
    }
    modifier onlydistributor {
        require(msg.sender == distributor);
          _;
    }
    modifier onlyvendor {
        require(msg.sender == vendor);
          _;
    }

    uint public productCount;
    uint public transportCount;
    uint public distributeCount;
    uint public vendorCount;

    event ProductAdded(string _manufacturername, string _manufacturingdate, string _productid, string _productname, string _productdetails, string _totransportername);
    event TransportAdded(string _tranportername, string _tranportingdate, string _productid, string _productname, string _transportingaddress, string _todistributorname);
    event DistributeAdded(string _distributorname, string _distributingdate, string _productid, string _productname, string _addressofvendor, string _tovendorname);
    event VendorAdded(string _vendorname, string _vendorlocation, string _productid, string _productname);

    function addProduct(string memory _manufacturername, string memory _manufacturingdate, string memory _productid, string memory _productname, string memory _productdetails, string memory _totransportername) public returns(bytes32 _manufacturerHash){
        productCount++;
        products[productCount] = New_Product(_manufacturername, _manufacturingdate, _productid, _productname, _productdetails, _totransportername);
        emit ProductAdded(_manufacturername, _manufacturingdate, _productid, _productname, _productdetails, _totransportername);
        isTransported = false;
        isGenuine = true;
        manufacturerHash = sha256(abi.encode(_productid));
        productidHash[_productid] = manufacturerHash;
        return manufacturerHash;
    }


    function addTranport(string memory _tranportername, string memory _tranportingdate, string memory _productid, string memory _productname, string memory _transportingaddress, string memory _todistributorname) public returns(bytes32 _transporterHash) {
        transportCount++;
        transports[transportCount] = Transport_Product(_tranportername, _tranportingdate, _productid, _productname, _transportingaddress, _todistributorname);
        emit TransportAdded(_tranportername, _tranportingdate, _productid, _productname, _transportingaddress, _todistributorname);
        isTransported = true;
        isDistributed = false;
        manufacturerHash = productidHash[_productid];
        // bytes memory manufacturerbytes = abi.encode(manufacturerHash);
        transporterHash = sha256(abi.encodePacked(manufacturerHash));
        productidHash[_productid] = transporterHash;
        return transporterHash;
    }

    function addDistribute(string memory _distributorname, string memory _distributingdate, string memory _productid, string memory _productname, string memory _addressofvendor, string memory _tovendorname) public returns(bytes32 _distributorHash){
        distributeCount++;
        distributes[distributeCount] = Distribute_Product(_distributorname, _distributingdate, _productid, _productname, _addressofvendor, _tovendorname);
        emit DistributeAdded(_distributorname, _distributingdate, _productid, _productname, _addressofvendor, _tovendorname);
        isDistributed = true;
        isVendored = false;
        transporterHash = productidHash[_productid];
        // bytes memory transporterbytes = abi.encode(transporterHash);
        distributorHash = sha256(abi.encodePacked(transporterHash));
        productidHash[_productid] = transporterHash;
        return distributorHash;
    }

    function addVendor(string memory _vendororname, string memory _vendorlocation, string memory _productid, string memory _productname) public returns(bytes32 _vendorHash) {
        vendorCount++;
        vendors[vendorCount] = Vendor_Product(_vendororname, _vendorlocation, _productid, _productname);
        emit VendorAdded(_vendororname, _vendorlocation, _productid, _productname);
        isVendored = true;
        distributorHash = productidHash[_productid];
        // bytes memory distributorbytes = abi.encode(distributorHash);
        vendorHash = sha256(abi.encodePacked(distributorHash));
        productidHash[_productid] = vendorHash;
        return vendorHash;
    }

    function getProductDetails()  public view returns (New_Product[] memory) {
        New_Product[] memory prod = new New_Product[](productCount);
        for (uint i = 1; i <= productCount; i++) {
            prod[i-1] = products[i];
        }
        return (prod);
    }

    function getTransportDetails() public view returns (Transport_Product[] memory) {
        Transport_Product[] memory trans = new Transport_Product[](transportCount);
        for (uint i = 1; i <= transportCount; i++) {
            trans[i-1] = transports[i];
        }
        return (trans);
    }

    function getDistributeDetails() public view returns (Distribute_Product[] memory) {
        Distribute_Product[] memory dist = new Distribute_Product[](distributeCount);
        for (uint i = 1; i <= distributeCount; i++) {
            dist[i-1] = distributes[i];
        }
        return (dist);
    }

    function getVendorDetails() public view returns (Vendor_Product[] memory) {
        Vendor_Product[] memory vend = new Vendor_Product[](vendorCount);
        for (uint i = 1; i <= vendorCount; i++) {
            vend[i-1] = vendors[i];
        }
        return (vend);
    }

    function checkgenuine(string memory _productid) public returns (bool) {
        bytes memory productidbytes = abi.encode(_productid);
        bytes32 ma = sha256(abi.encodePacked(productidbytes));
        bytes32 tr = sha256(abi.encodePacked(ma));
        bytes32 di = sha256(abi.encodePacked(tr));
        bytes32 ve = sha256(abi.encode(di));
        bytes32 actualbytes = productidHash[_productid];
        bytes32 actual = sha256(abi.encodePacked(actualbytes));
        if (ve == actual) {
            isGenuine = true;
        }
        else {
            isGenuine = false;
        }
        return (isGenuine);
    }
}