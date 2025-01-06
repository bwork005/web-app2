use std::fmt;

#[derive(Debug)]
pub enum Error {
    DatabaseError(pickledb::error::Error),
}

impl std::error::Error for Error {}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Error::DatabaseError(e) => write!(f, "PickleDB error: {}", e),
        }
    }
}

impl From<pickledb::error::Error> for Error {
    fn from(err: pickledb::error::Error) -> Self {
        Error::DatabaseError(err)
    }
}
