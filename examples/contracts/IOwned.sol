interface IOwned {
	event OwnerUpdated(address indexed, address indexed);
	function owner() external view returns (address);
	function setOwner(address) external;
}