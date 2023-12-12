import { Header } from '@/components/common/Header';
import { Button, IconButton, MixButton } from '@/components/common/Button';

function App() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', margin: '100px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: '32px',
            gap: '16px',
          }}
        >
          <Button variant='primary' size={56}>
            Enabled
          </Button>
          <Button variant='primary' size={40}>
            Enabled
          </Button>
          <Button variant='secondary' size={40}>
            Enabled
          </Button>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: '32px',
            gap: '16px',
          }}
        >
          <Button variant='outlined' size={56}>
            Enabled
          </Button>
          <Button variant='outlined' size={40}>
            Enabled
          </Button>
          <Button variant='outlined' size={36}>
            Enabled
          </Button>
          <Button variant='outlined' size={28}>
            Enabled
          </Button>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: '32px',
            gap: '16px',
          }}
        >
          <IconButton
            style='add-card'
            icon='ic-plus'
            iconSize='24'
            iconColor='white'
          />
          <IconButton
            variant='outlined'
            style='arrow'
            icon='ic-arrow-right'
            iconSize='16'
            iconColor='gray900'
          />
          <IconButton
            variant='outlined'
            style='arrow'
            icon='ic-arrow-left'
            iconSize='16'
            iconColor='gray900'
          />
          <IconButton
            variant='outlined'
            style='square'
            icon='ic-delete'
            iconSize='24'
            iconColor='gray500'
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <MixButton
            variant='outlined'
            size={40}
            startIcon='ic-add-emoji'
            iconSize={24}
            iconColor='black'
            text='Enabled'
          />
          <MixButton
            variant='outlined'
            size={40}
            endIcon='ic-add-emoji'
            iconSize={24}
            iconColor='black'
            text='Enabled'
          />
          <MixButton
            variant='outlined'
            size={40}
            startIcon='ic-delete'
            iconSize={24}
            iconColor='black'
            text='Enabled'
          />
          <MixButton
            variant='outlined'
            size={40}
            endIcon='ic-arrow-right'
            iconSize={115}
            iconColor='black'
            text='Enabled'
          />
        </div>
      </div>
    </>
  );
}

export default App;
