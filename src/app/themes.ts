export interface Theme {
  name: string,
  properites: Object;
}

export const blue: Theme = {
  name: 'blue',
  properites: {
    "--mainColor": "var(--blue)",
    "--secColor": "var(--secBlue)"
  }
}
export const green: Theme = {
  name: 'green',
  properites: {
    "--mainColor": "var(--green)",
    "--secColor": "var(--secGreen)"
  }
}
export const purple: Theme = {
  name: 'purple',
  properites: {
    "--mainColor": "var(--purple)",
    "--secColor": "var(--secPurple)"
  }
}

export const orange: Theme = {
  name: 'orange',
  properites: {
    "--mainColor": "var(--orange)",
    "--secColor": "var(--secOrange)"
  }
}

export const dark: Theme = {
  name: 'dark',
  properites: {
    "--mainColor": "var(--dark)",
    "--secColor": "var(--secDark)"
  }
}
