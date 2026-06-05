export type Brand<TValue, TBrand extends string> = TValue & {
  readonly __brand: TBrand;
};

export type AbsoluteUrl = Brand<string, "AbsoluteUrl">;
export type StoragePublicUrl = Brand<AbsoluteUrl, "StoragePublicUrl">;
export type StoragePath = Brand<string, "StoragePath">;

export type StorageActionError =
  | "ACCESS_DENIED"
  | "FILE_MISSING"
  | "FILE_TOO_LARGE"
  | "UPLOAD_FAILED"
  | "DELETE_FAILED"
  | "INVALID_STORAGE_PATH";

export type UploadFileResult =
  | {
      success: true;
      url: StoragePublicUrl;
      path: StoragePath;
    }
  | {
      success: false;
      error: StorageActionError;
      message: string;
    };

export type DeleteFileResult =
  | {
      success: true;
      path: StoragePath;
    }
  | {
      success: false;
      error: StorageActionError;
      message: string;
    };
