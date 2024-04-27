import * as DropdownMenu from 'zeego/dropdown-menu';
import RoundBtn from './RoundBtn';

export function Dropdown() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <RoundBtn icon={'ellipsis-horizontal'} text="More" />
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
                
                <DropdownMenu.Item key="Statement">
                    <DropdownMenu.ItemTitle>Statement</DropdownMenu.ItemTitle>
                    <DropdownMenu.ItemIcon
                        ios={{
                            name: 'list.bullet.rectangle.fill',
                            pointSize: 24,
                        }}
                    />
                </DropdownMenu.Item>
                <DropdownMenu.Item key="Convert">
                    <DropdownMenu.ItemTitle>Convert</DropdownMenu.ItemTitle>
                    <DropdownMenu.ItemIcon
                        ios={{
                            name: 'coloncurrencysign.arrow.circlepath',
                            pointSize: 24,
                        }}
                    />
                </DropdownMenu.Item>

                <DropdownMenu.Item key="background">
                    <DropdownMenu.ItemTitle>Background</DropdownMenu.ItemTitle>
                    <DropdownMenu.ItemIcon
                        ios={{ name: 'photo.fill', pointSize: 24 }}
                    />
                </DropdownMenu.Item>

                <DropdownMenu.Item key="account">
                    <DropdownMenu.ItemTitle>Account</DropdownMenu.ItemTitle>
                    <DropdownMenu.ItemIcon
                        ios={{
                            name: 'plus.rectangle.on.folder.fill',
                            pointSize: 24,
                        }}
                    />
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
