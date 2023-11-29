export interface DataPlayerPlayer {
  club_members: Array<{
      club_member: {
          names: Array<{
            name: {
              id: string;
              display_name: string;
            }
          }>;
          assets: Array<{
              avatar: {
                  url: string;
              };
          }>;
      };
  }>;
}

export interface DataPlayer {
  id: string;
  fullName: string;
  image: string;
}

export interface DataPlayerApi {
  id: string;
  full_name: string;
}