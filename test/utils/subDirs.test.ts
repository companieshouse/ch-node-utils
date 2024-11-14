import fs, { Stats } from 'fs';
import path from 'path';
import SubDirs from "../../src/utils/SubDirs";

jest.mock('fs');
jest.mock('path');

describe('SubDirs', () => {
   let statSyncMock: jest.Mock;

   beforeEach(() => {
      statSyncMock = jest.fn((itemPath) => ({
         isDirectory: () => itemPath.includes('subdir')
      } as Stats)); // Cast to Stats

      jest.spyOn(fs, 'statSync').mockImplementation(statSyncMock);
      path.join = jest.fn((...args) => args.join('/'));
   });

   describe('getSubDirs', () => {
      it('should return only subdirectories', () => {
         const dirPath = '/test';
         const contents = ['file1.txt', 'subdir1', 'subdir2', 'file2.txt'];

         fs.readdirSync = jest.fn().mockReturnValue(contents);

         const result = SubDirs.getSubDirs(dirPath);

         expect(result).toEqual(['subdir1', 'subdir2']);
         expect(fs.readdirSync).toHaveBeenCalledWith(dirPath);
         expect(statSyncMock).toHaveBeenCalledTimes(contents.length);
      });

      it('should return an empty array if there are no subdirectories', () => {
         const dirPath = '/test';
         const contents = ['file1.txt', 'file2.txt'];

         fs.readdirSync = jest.fn().mockReturnValue(contents);
         statSyncMock.mockImplementation((itemPath) => ({
            isDirectory: () => false
         } as Stats)); // Cast to Stats

         const result = SubDirs.getSubDirs(dirPath);

         expect(result).toEqual([]);
         expect(fs.readdirSync).toHaveBeenCalledWith(dirPath);
         expect(statSyncMock).toHaveBeenCalledTimes(contents.length);
      });

      it('should return an empty array if the directory is empty', () => {
         const dirPath = '/test';
         const contents = [];

         fs.readdirSync = jest.fn().mockReturnValue(contents);

         const result = SubDirs.getSubDirs(dirPath);

         expect(result).toEqual([]);
         expect(fs.readdirSync).toHaveBeenCalledWith(dirPath);
      });

      it('should handle mixed files and subdirectories', () => {
         const dirPath = '/test';
         const contents = ['file1.txt', 'subdir1', 'file2.txt', 'subdir2'];

         fs.readdirSync = jest.fn().mockReturnValue(contents);

         const result = SubDirs.getSubDirs(dirPath);

         expect(result).toEqual(['subdir1', 'subdir2']);
         expect(fs.readdirSync).toHaveBeenCalledWith(dirPath);
         expect(statSyncMock).toHaveBeenCalledTimes(contents.length);
      });
   });
});
